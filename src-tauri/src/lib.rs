// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use tauri::Manager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    #[allow(unused_mut)]
    let mut builder = tauri::Builder::default();

    // 仅在非移动端（Windows/macOS/Linux）加载插件
    #[cfg(desktop)]
    #[allow(unused_variables)]
    {
        builder = builder
            // be the first one to load the plugin
            .plugin(tauri_plugin_single_instance::init(|app, args, cwd| {
                if let Some(window) = app.get_webview_window("main") {
                    // 如果窗口最小化了，先恢复
                    let _ = window.unminimize();
                    // 显示window窗口
                    let _ = window.show();
                    // 然后将窗口激活、置顶
                    let _ = window.set_focus();
                }
            }))
            .plugin(tauri_plugin_window_state::Builder::new().build())
    }

    // 加载通用 Tauri 插件
    builder = builder
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_mc_status::init());

    // 加载 Tauri 应用程序
    builder
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
