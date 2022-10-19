import { writable } from "svelte/store";

export const currentUser = writable([
  {
    image: {
      png: "./images/avatars/image-juliusomo.png",
      webp: "./images/avatars/image-juliusomo.webp",
    },
    username: "juliusomo",
  },
]);


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
