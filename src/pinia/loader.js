import { defineStore } from 'pinia';

let resetTimer = null;
let routingTimer = null;

export const loader = defineStore('loader', {
    state: () => ({
        latency: 200,
        pendingRequests: [],
        waveCompleted: 0,
        requestId: 0,
        routingRequestId: null,
        waveTotal: 0,
        visible: false,
    }),

    getters: {
        progress: state => state.waveTotal
            ? Math.min(10 + (state.waveCompleted / state.waveTotal) * 90, 100)
            : 0,
        shouldStop: state => state.waveCompleted >= state.waveTotal,
    },

    actions: {
        addRequest(payload = {}) {
            clearTimeout(resetTimer);
            this.visible = true;

            const id = ++this.requestId;
            this.pendingRequests.push({ id, ...payload });

            setTimeout(() => {
                this.waveTotal += 1;
            }, 1);

            return id;
        },
        completeRequest(id) {
            const index = this.pendingRequests.findIndex(request => request.id === id);

            if (index === -1) {
                return;
            }

            this.pendingRequests.splice(index, 1);

            setTimeout(() => {
                this.waveCompleted += 1;
                this.update();
            }, this.latency);
        },
        finishRouting() {
            if (routingTimer) {
                clearTimeout(routingTimer);
                routingTimer = null;
            }

            if (this.routingRequestId !== null) {
                this.completeRequest(this.routingRequestId);
                this.routingRequestId = null;
            }
        },
        init(http, router) {
            http.interceptors.request.use(config => {
                config.__ensoRequestId = this.addRequest({
                    method: config.method,
                    type: 'http',
                    url: config.url,
                });

                this.trackAbort(config);

                return config;
            });

            http.interceptors.response.use(response => {
                this.completeRequest(response.config.__ensoRequestId);
                return response;
            }, error => {
                if (error.config?.__ensoRequestId) {
                    this.completeRequest(error.config.__ensoRequestId);
                }

                return Promise.reject(error);
            });

            router.beforeEach((to, from, next) => {
                if (to.fullPath !== from.fullPath && this.routingRequestId === null) {
                    this.routingRequestId = this.addRequest({ type: 'route' });
                    routingTimer = setTimeout(() => this.finishRouting(), this.latency * 2);
                }

                next();
            });

            router.afterEach(() => this.finishRouting());
            router.onError(() => this.finishRouting());
        },
        stop() {
            this.visible = false;
            this.pendingRequests = [];
            this.waveTotal = 0;
            this.waveCompleted = 0;
            this.requestId = 0;
            this.routingRequestId = null;
        },
        trackAbort(config) {
            const id = config.__ensoRequestId;

            config.cancelToken?.promise?.then(() => this.completeRequest(id));

            if (!config.signal) {
                return;
            }

            if (config.signal.aborted) {
                this.completeRequest(id);
                return;
            }
            
            config.signal.addEventListener('abort', () => this.completeRequest(id), { once: true });
        },
        update() {
            if (this.shouldStop) {
                clearTimeout(resetTimer);
                resetTimer = setTimeout(() => this.stop(), this.latency * 1.5);
            }
        },
    },
});
