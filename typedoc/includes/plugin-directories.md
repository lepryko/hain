# Plugin Directories

There are two plugin directories for Hain:

- **MAIN_PLUGIN_REPO**: `${process.env.LOCALAPPDATA}/hain-user/plugins`
  - This is managed by hpm(hain-package-manager) and is not safe for developing plugins.
   
- **DEV_PLUGIN_REPO**: `${process.env.LOCALAPPDATA}/hain-user/devplugins`
  - This is where you should place your plugins that are in development.
  - e.g. `C:\Users\John\AppData\Local\hain-user\...`
