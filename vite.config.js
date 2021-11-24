import { defineConfig } from "vite";
import Component from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
    plugins: [
        vue(),
        Component({
            resolvers: [AntDesignVueResolver()],
            extensions: ["vue"],
        }),
        {
            transform(code, id) {
                if (id.endsWith(".vue")) {
                    code = code.replace(/\/public/g, "");
                }
                return code;
            }
        }
    ],
    resolve: {
        alias: {
        "@": path.resolve(__dirname, "src"),
        },
        extensions: [".vue", ".js"]
    },
});
