module.exports = {
  navigateFallback: "/index.html",
  navigateFallbackWhitelist: [/^(?!\/__).*/],
  stripPrefix: "dist",
  root: "dist/",
  staticFileGlobs: ["dist/index.html", "dist/**.js", "dist/**.css"]
};
