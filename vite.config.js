import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
   plugins: [react()],
   server: {
      // origin: 'http://13.51.241.185:7000',
      // origin: 'http://13.51.241.185:7000',
      proxy: {
         "/v2": {
            // target: 'http://localhost:7000'
            target: "http://13.51.241.185:7000",
            changeOrigin: true,
            secure: false,
         },
      },
   },
   optimizeDeps: {
      include: ["react-quilljs"],
   },
   build: {
      commonjsOptions: {
         include: [/react-quilljs/, /node_modules/],
      },
   },
});

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//    define: {
//       "process.env": process.env,
//    },
//    plugins: [react()],
//    resolve: {
//       alias: [
//          {
//             find: /^~.+/,
//             replacement: (val) => {
//                return val.replace(/^~/, "");
//             },
//          },
//       ],
//    },
//    build: {
//       commonjsOptions: {
//          transformMixedEsModules: true,
//       },
//    },
//    server: {
//       host: true,
//    },
// });
