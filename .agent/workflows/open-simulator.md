---
description: Mở trình giả lập iPhone 14 Pro ở chế độ cửa sổ lơ lửng
---

Để mở trình giả lập, hãy chạy lệnh sau:

// turbo
1. Chạy lệnh mở cửa sổ giả lập:
```powershell
Start-Process "chrome.exe" -ArgumentList "--app=http://localhost:5173 --window-size=375,812"
```

*Lưu ý: Nếu bro không dùng Chrome, có thể thay bằng `msedge.exe`.*
