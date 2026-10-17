package com.ikeriano.grandprix;
import android.app.Activity;
import android.content.Intent;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
public class MainActivity extends Activity {
  private WebView web;
  private ValueCallback<Uri[]> fileCb;
  private static final int PICK = 4711;
  private static final String HOST = "appassets.androidplatform.net";
  private static String mime(String p) {
    p = p.toLowerCase();
    if (p.endsWith(".html")) return "text/html"; if (p.endsWith(".js")) return "application/javascript"; if (p.endsWith(".css")) return "text/css";
    if (p.endsWith(".png")) return "image/png"; if (p.endsWith(".webp")) return "image/webp"; if (p.endsWith(".jpg")) return "image/jpeg";
    if (p.endsWith(".mp3")) return "audio/mpeg"; if (p.endsWith(".wav")) return "audio/wav"; if (p.endsWith(".mp4")) return "video/mp4"; if (p.endsWith(".json")) return "application/json"; if (p.endsWith(".woff")) return "font/woff"; if (p.endsWith(".woff2")) return "font/woff2";
    return "application/octet-stream";
  }
  @Override protected void onCreate(Bundle b) {
    super.onCreate(b);
    requestWindowFeature(Window.FEATURE_NO_TITLE);
    getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
    if (Build.VERSION.SDK_INT >= 28) getWindow().getAttributes().layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
    web = new WebView(this);
    web.setBackgroundColor(Color.BLACK);
    WebSettings s = web.getSettings();
    s.setJavaScriptEnabled(true);
    s.setDomStorageEnabled(true);
    s.setMediaPlaybackRequiresUserGesture(false);
    s.setSupportZoom(false);
    web.setOverScrollMode(View.OVER_SCROLL_NEVER);
    web.setWebViewClient(new WebViewClient() {
      @Override public WebResourceResponse shouldInterceptRequest(WebView v, WebResourceRequest req) {
        Uri u = req.getUrl();
        if (!HOST.equals(u.getHost())) return null;
        String path = u.getPath(); if (path == null || path.equals("/")) path = "/index.html";
        try {
          InputStream in = getAssets().open("www" + path);
          WebResourceResponse r = new WebResourceResponse(mime(path), null, in);
          Map<String, String> h = new HashMap<>(); h.put("Access-Control-Allow-Origin", "*"); h.put("Cache-Control", "no-cache"); r.setResponseHeaders(h);
          return r;
        } catch (Exception e) {
          return new WebResourceResponse("text/plain", "utf-8", 404, "Not Found", new HashMap<String, String>(), null);
        }
      }
    });
    web.setWebChromeClient(new WebChromeClient() {
      @Override public boolean onShowFileChooser(WebView v, ValueCallback<Uri[]> cb, FileChooserParams p) {
        if (fileCb != null) fileCb.onReceiveValue(null);
        fileCb = cb;
        Intent i = new Intent(Intent.ACTION_GET_CONTENT); i.addCategory(Intent.CATEGORY_OPENABLE); i.setType("image/*");
        try { startActivityForResult(Intent.createChooser(i, "Elegir logo"), PICK); } catch (Exception e) { fileCb = null; cb.onReceiveValue(null); return false; }
        return true;
      }
    });
    setContentView(web);
    hideUi();
    web.loadUrl("https://" + HOST + "/index.html");
  }
  @SuppressWarnings("deprecation")
  private void hideUi() {
    web.setSystemUiVisibility(View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY | View.SYSTEM_UI_FLAG_FULLSCREEN | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION);
  }
  @Override protected void onActivityResult(int req, int res, Intent data) {
    if (req == PICK) {
      if (fileCb != null) { Uri[] r = null; if (res == RESULT_OK && data != null && data.getData() != null) r = new Uri[] { data.getData() }; fileCb.onReceiveValue(r); fileCb = null; }
      return;
    }
    super.onActivityResult(req, res, data);
  }
  @Override public void onWindowFocusChanged(boolean f) { super.onWindowFocusChanged(f); if (f) hideUi(); }
  @Override public void onBackPressed() { web.evaluateJavascript("window.__boom&&__boom.goMenu()", null); }
  @Override protected void onPause() { if (web != null) { web.evaluateJavascript("window.__audio&&__audio.pauseAll()", null); web.onPause(); web.pauseTimers(); } super.onPause(); }
  @Override protected void onResume() { super.onResume(); if (web != null) { web.resumeTimers(); web.onResume(); web.evaluateJavascript("window.__audio&&__audio.resumeAll()", null); hideUi(); } }
  @Override protected void onDestroy() { if (web != null) web.destroy(); super.onDestroy(); }
}
