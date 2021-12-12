import directiveSroll from "./directive-scroll";

const directives = [
    directiveSroll,
]

export default {
    install(app) {
        directives.forEach(directive => {
            app.use(directive);
        });
    }
}