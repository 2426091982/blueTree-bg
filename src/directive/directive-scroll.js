import { isNumber } from "@/utils";
import { isObject, isFunction } from "lodash";

/**
 * v-scroll="Function"
 * v-scroll="{
 *  scroll: Function,
 *  end: Function | {
 *      offset: Number,
 *      handle: Function,
 *  },
 * }"
 */
export default {
    install: function installDirectiveScroll(app) {
        app.directive("scroll", {
            mounted(el, bindings, vnode, preVnode) {
                let value = bindings.value;
                let triggerScroll;
                let scrollEnd;
                let scrollEndOffset = 0;
                if (isFunction(value)) {
                    triggerScroll = value;
                } else if (isObject(value)) {
                    triggerScroll = value.scroll;
                    scrollEnd = value.end;
                    if (triggerScroll && !isFunction(triggerScroll)) {
                        console.error(`指令 v-scroll="{ scroll }", scroll必须是一个函数`);
                        return; 
                    };

                    if (isObject(value.end)) {
                        scrollEndOffset = parseInt(value.end.offset) || 0;
                        scrollEnd = value.end.handle;
                        if (value.end.offset && !isNumber(scrollEndOffset)) {
                            console.error(`指令 v-scroll="{ end: Object }", end.offset必须是数字`)
                            return;
                        };  
                    };
                    if (scrollEnd && !isFunction(scrollEnd)) {
                        console.error(`指令 v-scroll="{ end: Object }", end.handle必须是函数`)
                        return;
                    }
                } else {
                    if (value) {
                        console.error("指令 v-scroll 参数必须是函数() => {}, 或者对象{ scroll: Function, end: Function | { offset: Number, handle: Function } }")
                    };
                    return;
                };
                const scroll = (e) => {
                    let height = e.target.scrollHeight - e.target.clientHeight;
                    let scrollTop = e.target.scrollTop;
                    triggerScroll && triggerScroll(scrollTop, e);
                    if (scrollTop + scrollEndOffset >= height) {
                        scrollEnd && scrollEnd(scrollTop, e);
                    };
                };
                el.scrollFunction = scroll;
                el.addEventListener("scroll", scroll);
            },
            beforeUnmount(el) {
                if (el.scrollFunction) {
                    el.removeEventListener("scroll", el.scrollFunction);
                }
            }
        })
    }
}