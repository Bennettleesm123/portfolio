"use client";

let collapseHome = () => {};

export function bindHomeCollapse(collapse) {
  collapseHome = collapse;
}

export function collapseToHome() {
  collapseHome();
}
