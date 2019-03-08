<script>
export default {
    name: 'Menus',

    props: {
        isActive: {
            type: Function,
            required: true,
        },
        menus: {
            type: Array,
            required: true,
        },
        collapsed: {
            type: Boolean,
            default: false,
        },
    },

    watch: {
        collapsed() {
            if (this.collapsed) {
                const height = this.$el.scrollHeight;

                if (!this.$el.style.height) {
                    this.$el.style.height = `${height}px`;
                }

                setTimeout(() => {
                    this.$el.style.height = 0;
                    this.$emit('shrink', height);
                }, 1);

                return;
            }

            this.$el.style.height = `${this.$el.scrollHeight}px`;
            this.$emit('extend', this.$el.scrollHeight);
        },
    },

    mounted() {
        if (this.collapsed) {
            this.$el.style.height = 0;
        }
    },

    methods: {
        shrink(height) {
            this.$el.style.height = `${parseInt(this.$el.style.height, 10) - height}px`;
            this.$emit('shrink', height);
        },
        extend(height) {
            this.$el.style.height = `${height + parseInt(this.$el.style.height, 10)}px`;
            this.$emit('extend', height);
        },
    },

    render() {
        return this.$scopedSlots.default({
            menus: this.menus,
            isActive: this.isActive,
            parentMenuEvents: {
                shrink: this.shrink,
                extend: this.extend,
            },
        });
    },
};
</script>
