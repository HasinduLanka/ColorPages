<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  .backbutton {
    z-index: 10;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4em00LjU5LTEyLjQyTDEwIDE0LjE3bC0yLjU5LTIuNThMNiAxM2w0IDQgOC04eiIvPjwvc3ZnPgo=");
  }

  .icon-palette {
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20enable-background%3D%22new%200%200%2024%2024%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%23000000%22%3E%3Cg%3E%3Crect%20fill%3D%22none%22%20height%3D%2224%22%20width%3D%2224%22%2F%3E%3C%2Fg%3E%3Cg%3E%3Cg%3E%3Cg%3E%3Cg%3E%3Cpath%20d%3D%22M12%2C22C6.49%2C22%2C2%2C17.51%2C2%2C12S6.49%2C2%2C12%2C2s10%2C4.04%2C10%2C9c0%2C3.31-2.69%2C6-6%2C6h-1.77c-0.28%2C0-0.5%2C0.22-0.5%2C0.5%20c0%2C0.12%2C0.05%2C0.23%2C0.13%2C0.33c0.41%2C0.47%2C0.64%2C1.06%2C0.64%2C1.67C14.5%2C20.88%2C13.38%2C22%2C12%2C22z%20M12%2C4c-4.41%2C0-8%2C3.59-8%2C8s3.59%2C8%2C8%2C8%20c0.28%2C0%2C0.5-0.22%2C0.5-0.5c0-0.16-0.08-0.28-0.14-0.35c-0.41-0.46-0.63-1.05-0.63-1.65c0-1.38%2C1.12-2.5%2C2.5-2.5H16%20c2.21%2C0%2C4-1.79%2C4-4C20%2C7.14%2C16.41%2C4%2C12%2C4z%22%2F%3E%3Ccircle%20cx%3D%226.5%22%20cy%3D%2211.5%22%20r%3D%221.5%22%2F%3E%3Ccircle%20cx%3D%229.5%22%20cy%3D%227.5%22%20r%3D%221.5%22%2F%3E%3Ccircle%20cx%3D%2214.5%22%20cy%3D%227.5%22%20r%3D%221.5%22%2F%3E%3Ccircle%20cx%3D%2217.5%22%20cy%3D%2211.5%22%20r%3D%221.5%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E");
  }

  .icon-delete {
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%23000000%22%3E%3Cpath%20d%3D%22M0%200h24v24H0V0z%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M14.12%2010.47L12%2012.59l-2.13-2.12-1.41%201.41L10.59%2014l-2.12%202.12%201.41%201.41L12%2015.41l2.12%202.12%201.41-1.41L13.41%2014l2.12-2.12zM15.5%204l-1-1h-5l-1%201H5v2h14V4zM6%2019c0%201.1.9%202%202%202h8c1.1%200%202-.9%202-2V7H6v12zM8%209h8v10H8V9z%22%2F%3E%3C%2Fsvg%3E");
  }

  .icon-colorreset {
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%23000000%22%3E%3Cpath%20d%3D%22M0%200h24v24H0V0zm0%200h24v24H0V0zm0%200h24v24H0V0z%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M12%206.36c1.53%202%203.08%204.43%203.71%206.24l2.23%202.23c.03-.27.06-.55.06-.83%200-3.98-6-10.8-6-10.8s-1.18%201.35-2.5%203.19l1.44%201.44c.34-.51.7-1%201.06-1.47zM5.41%205.14L4%206.55l3.32%203.32C6.55%2011.33%206%2012.79%206%2014c0%203.31%202.69%206%206%206%201.52%200%202.9-.57%203.95-1.5l2.63%202.63L20%2019.72%205.41%205.14zM12%2018c-2.21%200-4-1.79-4-4%200-.69.32-1.62.81-2.64l5.72%205.72c-.7.56-1.57.92-2.53.92z%22%2F%3E%3C%2Fsvg%3E");
  }

  .icon-colorfill {
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20enable-background%3D%22new%200%200%2024%2024%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%23000000%22%3E%3Cg%3E%3Crect%20fill%3D%22none%22%20height%3D%2224%22%20width%3D%2224%22%2F%3E%3C%2Fg%3E%3Cg%3E%3Cpath%20d%3D%22M16.56%2C8.94L7.62%2C0L6.21%2C1.41l2.38%2C2.38L3.44%2C8.94c-0.59%2C0.59-0.59%2C1.54%2C0%2C2.12l5.5%2C5.5C9.23%2C16.85%2C9.62%2C17%2C10%2C17%20s0.77-0.15%2C1.06-0.44l5.5-5.5C17.15%2C10.48%2C17.15%2C9.53%2C16.56%2C8.94z%20M5.21%2C10L10%2C5.21L14.79%2C10H5.21z%20M19%2C11.5c0%2C0-2%2C2.17-2%2C3.5%20c0%2C1.1%2C0.9%2C2%2C2%2C2s2-0.9%2C2-2C21%2C13.67%2C19%2C11.5%2C19%2C11.5z%20M2%2C20h20v4H2V20z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");
  }

  /* * {
    border: 1px solid red !important; 
  } */
</style>
