<script lang="ts">
  function removePost(id: string) {
    deleteGraduate(id).then(() => {
      posts = posts.filter(post => post.id !== id);
    });
    menuOpenIdx = null;
  }
  let menuOpenIdx: number | null = null;
  let editIdx: number | null = null;

  // For editing
  function startEdit(idx: number) {
    editIdx = idx;
    const post = posts[idx];
    name = post.name;
    institution = post.institution;
    course = post.course;
    date_grad = post.date_grad;
    testimony = post.testimony;
    showModal = true;
    menuOpenIdx = null;
  }

  async function updatePost(id: string) {
    if (!name || !testimony || !date_grad) return;
    const updated = {
      name,
      institution,
      course,
      date_grad,
      testimony
    };
    try {
      await updateGraduate(id, updated);
      const res = await getGraduates();
      posts = res.result;
    } catch {}
    closeModal();
    editIdx = null;
  }
  import { onMount } from 'svelte';
  import { getGraduates, createGraduate, updateGraduate, deleteGraduate } from '$lib/api';

  let posts: any[] = [];

  let name = '';
  let institution = '';
  let course = '';
  let date_grad = '';
  let testimony = '';
  let showModal = false;

  function openModal() {
    showModal = true;
  }

  // Fetch graduates from backend on mount
  onMount(async () => {
    try {
      const res = await getGraduates();
      posts = res.result;
    } catch (e) {
      console.error('Failed to fetch graduates:', e);
    }
  });
  function closeModal() {
    showModal = false;
    name = '';
    institution = '';
    course = '';
    date_grad = '';
    testimony = '';
  }
  async function addPost() {
    if (!name || !testimony || !date_grad) return;
    const newPost = {
      name,
      institution,
      course,
      date_grad,
      testimony
    };
    try {
      await createGraduate(newPost);
      const res = await getGraduates();
      posts = res.result;
    } catch {}
    closeModal();
  }

  // ...existing code...

    // ...existing code...
</script>

<div class="relative min-h-screen">
  <div class="fixed inset-0 -z-10">
    <img src="/images/library.jpg" alt="Library background" class="w-full h-full object-cover blur-sm" />
  </div>
  <div class="max-w-4xl mx-auto py-10 px-4">
    <h1 class="text-5xl font-extrabold text-white mb-8 text-center drop-shadow-lg">Graduate Stories</h1>
    <div class="flex justify-end mb-8">
      <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow" on:click={openModal}>Share Story</button>
    </div>

    {#if showModal}
      <div class="fixed inset-0 flex items-center justify-center z-50">
        <div class="absolute inset-0 backdrop-blur-sm"></div>
        <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative animate-fade-in z-10">
          <button class="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold" on:click={closeModal} aria-label="Close">&times;</button>
          <h2 class="text-2xl font-bold text-blue-700 mb-4 text-center">Share Your Story!</h2>
          <form class="flex flex-col gap-4" on:submit|preventDefault={() => {
            if (editIdx !== null && editIdx >= 0) {
              updatePost(posts[editIdx].id);
            } else {
              addPost();
            }
          }}>
            <input class="border rounded px-3 py-2" placeholder="Your Name" bind:value={name} required />
            <input class="border rounded px-3 py-2" placeholder="Institution" bind:value={institution} required />
            <input class="border rounded px-3 py-2" placeholder="Course" bind:value={course} required />
            <input class="border rounded px-3 py-2" type="date" placeholder="Date of Graduation" bind:value={date_grad} required />
            <textarea class="border rounded px-3 py-2" placeholder="Share your testimony..." bind:value={testimony} required rows="3"></textarea>
              <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded self-end" type="submit">{editIdx !== null && editIdx >= 0 ? 'Save' : 'Post'}</button>
          </form>
        </div>
      </div>
    {/if}

    <div class="space-y-8">
      {#each posts as post, idx}
        <div class="relative rounded-lg shadow p-6 flex flex-col md:flex-row gap-6" style="background-color: #F6F1E9;">
          <!-- 3-dot menu -->
          <div class="absolute top-4 right-4 z-20">
            <button class="p-2 rounded-full hover:bg-gray-200" on:click={() => menuOpenIdx = menuOpenIdx === idx ? null : idx} aria-label="Options">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
            </button>
            {#if menuOpenIdx === idx}
              <div class="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg flex flex-col">
                <button class="px-4 py-2 text-left hover:bg-gray-100" on:click={() => startEdit(idx)}>Edit</button>
                <button class="px-4 py-2 text-left hover:bg-gray-100 text-red-600" on:click={() => removePost(post.id)}>Delete</button>
              </div>
            {/if}
          </div>
          {#if post.date_posted}
            <span class="absolute top-4 right-16 text-sm text-gray-500">Date Posted: <span class="font-semibold">{new Date(post.date_posted).toLocaleDateString()}</span></span>
          {/if}
          <img src="/images/content_avatar.png"  alt={post.name} class="w-20 h-20 rounded-full object-cover border-4 border-blue-200 mx-auto md:mx-0" />
          <div class="flex-1 flex flex-col justify-center">
            <div class="flex items-center gap-2 mb-2">
              <span class="font-bold text-blue-800">{post.name}</span>
            </div>
            <div class="flex flex-wrap gap-4 mb-2">
              <span class="bg-blue-100 text-blue-800 px-3 py-1.5 rounded text-base">{post.institution}</span>
              <span class="bg-blue-100 text-blue-800 px-3 py-1.5 rounded text-base">{post.course}</span>
            </div>
            <div class="flex flex-wrap gap-4 mb-2">
              <span class="text-sm text-gray-500">Date of Graduation: <span class="font-semibold">{post.date_grad}</span></span>
            </div>
            <p class="text-lg text-gray-700 italic">"{post.testimony}"</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>