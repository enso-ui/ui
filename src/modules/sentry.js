import * as SentryLib from "@sentry/vue";
import { Integrations } from "@sentry/tracing";
import reportable from '@enso-ui/sentry';

class Sentry {
    constructor(app, router) {
        this.app = app;
        this.router = router;
    }

    init(state) {
        SentryLib.init({
            app: this.app,
            dsn: state.meta.sentryDsn,
            environment: state.meta.env,
            integrations: [
                new Integrations.BrowserTracing({
                    routingInstrumentation: SentryLib.vueRouterInstrumentation(this.router),
                    tracingOrigins: ["localhost", /^\//],
                }),
            ],
            logErrors: true,
            tracesSampleRate: 0,
            beforeSend: event => reportable(event),
        });

        SentryLib.setUser({
            id: state.user.id,
            email: state.user.email,
            role: state.user.role,
        });
    }
}

export default Sentry;
