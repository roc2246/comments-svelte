import { writable } from "svelte/store";

export const userStore = writable(null);

export async function getUser() {
  let response = await fetch("/user");
  return response.ok ? await response.json() : null;
}

export const commentsStore = writable(null);

export async function getComments() {
  let response = await fetch("/comments");
  return response.ok ? await response.json() : null;
}
