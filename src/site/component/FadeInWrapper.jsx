import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function FadeInWrapper({ children, delay = 0, duration = 0.5 }) {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

    useEffect(() => {
        if (inView) {
        controls.start("visible");
        }
    }, [controls, inView]);

    return (
        <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        transition={{ duration, delay }}
        variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
        }}
        >
        {children}
        </motion.div>
    );
}