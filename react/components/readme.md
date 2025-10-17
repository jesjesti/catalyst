# 📜 Infinite Scroll Table (React + Material UI + React Virtuoso)

A lightweight, **smooth infinite-scroll table** component built with **React**, **Material UI**, and **React Virtuoso**.  
It fetches paginated data from a backend API using `offset` and `limit` parameters, and only keeps a small number of rows in memory — ensuring seamless scrolling performance even for datasets with **10,000+ records**.

---

## 🚀 Features

✅ Infinite scrolling using backend pagination (`offset + limit`)  
✅ Smooth virtualization — no visible jump or flicker  
✅ Automatically discards older rows to save memory  
✅ Fixed Material UI table header  
✅ Customizable fetch size and memory window  
✅ Fully responsive and minimal setup

---

## 🧱 Tech Stack

- **React 18+**
- **Material UI** (`@mui/material`)
- **React Virtuoso** (`react-virtuoso`)

---

## 📦 Installation

Run the following commands in your project:

```bash
npm install react-virtuoso @mui/material @emotion/react @emotion/styled
```

## Component Logic Overview

| Concept             | Description                                                                             |
| ------------------- | --------------------------------------------------------------------------------------- |
| Backend Pagination  | Fetches pages from `/api/products?offset=X&limit=10` using offset + limit.              |
| Virtualization      | Renders only visible rows via `react-virtuoso` for smooth performance.                  |
| Memory Optimization | Maintains a sliding window (MAX_ROWS, e.g., 15) and discards older rows to save memory. |
| Smooth Scroll       | Uses scroll anchoring to prevent UI jumps when removing or adding rows.                 |
| Lazy Loading        | Automatically fetches the next page when the user reaches the bottom.                   |

## Customization

You can easily tune the behavior:

| Variable     | Description                      | Default |
| ------------ | -------------------------------- | ------- |
| `PAGE_LIMIT` | Number of rows per API call      | `10`    |
| `MAX_ROWS`   | Max rows stored in memory        | `15`    |
| `overscan`   | Buffer rows above/below viewport | `3`     |
| `height`     | Table height                     | `75vh`  |

## Future Enhancements

- 🔄 Add a loading spinner at the bottom during data fetch

- 🚫 “No data” placeholder when results are empty

- ⚡ Skeleton loader for better UX

- 🧭 Top/Bottom scroll reset buttons
