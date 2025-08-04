// "use client";

// import { cn } from "@/utils/helpers";
// import { motion, Variants } from "framer-motion";
// import React from "react";

// type VariantType = "fadeIn" | "fadeUp" | "zoomIn";

// interface AnimatedWrapperProps {
//   children: React.ReactNode;
//   variant?: VariantType;
//   duration?: number;
//   delay?: number;
//   className?:string;
//   element?: keyof typeof motion;
// }

// const variants: Record<VariantType, Variants> = {
//   fadeIn: {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1 },
//   },
//   fadeUp: {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0 },
//   },
//   zoomIn: {
//     hidden: { opacity: 0, scale: 0.65 },
//     visible: { opacity: 1, scale: 1 },
//   },
// };

// const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({
//   children,
//   variant = "fadeIn",
//   duration = .5,
//   delay = 0,
//   className = "",
//   element = "div"
// }) => {
//   const MotionTag = motion[element] as React.ElementType;

  
//   return (
//     <MotionTag
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true, amount: 0.2 }}
//       transition={{ duration, delay , ease: "easeOut"}}
//       variants={variants[variant]}
//       className={cn(className)}
//     >
//       {children}
//     </MotionTag>
//   );
// };

// export default AnimatedWrapper;
