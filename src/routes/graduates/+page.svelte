<script lang="ts">
  let posts = [
    {
      name: 'Jane Doe',
      avatar: '/images/award.jpg',
      institution: 'State University',
      course: 'BS Computer Science',
      testimony: 'The scholarship changed my life! I was able to finish my studies and now have a great job.',
      date: '2025-06-01',
      hearts: 0,
      hearted: false
    },
    {
      name: 'John Smith',
      avatar: '/images/gradu.jpg',
      institution: 'City College',
      course: 'BA English',
      testimony: 'Thanks to the foundation, I graduated debt-free and made lifelong friends.',
      date: '2025-05-20',
      hearts: 0,
      hearted: false
    }
  ];

  let name = '';
  let avatar = '';
  let institution = '';
  let course = '';
  let testimony = '';
  let showModal = false;

  function openModal() {
    showModal = true;
  }
  function closeModal() {
    showModal = false;
    name = '';
    avatar = '';
    institution = '';
    course = '';
    testimony = '';
  }
  function addPost() {
    if (!name || !testimony) return;
    posts = [
      {
        name,
        avatar: avatar || '/images/award.jpg',
        institution,
        course,
        testimony,
        date: new Date().toISOString().slice(0, 10),
        hearts: 0,
        hearted: false
      },
      ...posts
    ];
    closeModal();
  }

  // Reactive heart toggle: update the posts array
  function toggleHeart(idx: number) {
    posts = posts.map((post, i) => {
      if (i === idx) {
        const hearted = !post.hearted;
        const hearts = hearted ? post.hearts + 1 : post.hearts - 1;
        return { ...post, hearted, hearts };
      }
      return post;
    });
  }
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
          <form class="flex flex-col gap-4" on:submit|preventDefault={addPost}>
            <input class="border rounded px-3 py-2" placeholder="Your Name" bind:value={name} required />
            <input class="border rounded px-3 py-2" placeholder="Institution" bind:value={institution} required />
            <input class="border rounded px-3 py-2" placeholder="Course" bind:value={course} required />
            <input class="border rounded px-3 py-2" placeholder="Avatar URL (optional)" bind:value={avatar} />
            <textarea class="border rounded px-3 py-2" placeholder="Share your testimony..." bind:value={testimony} required rows="3"></textarea>
            <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded self-end" type="submit">Post</button>
          </form>
        </div>
      </div>
    {/if}

    <div class="space-y-8">
      {#each posts as post, idx}
        <div class="relative rounded-lg shadow p-6 flex flex-col md:flex-row gap-6" style="background-color: #F6F1E9;">
          <!-- Heart react icon at upper right -->
          <button
            class="absolute top-4 right-4 flex items-center gap-1 group"
            title="Heart this story"
            on:click={() => toggleHeart(idx)}
            style="outline:none;"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill={post.hearted ? "#EF4444" : "none"}
              stroke="#EF4444"
              stroke-width="2"
              viewBox="0 0 24 24"
              class="transition-colors duration-200"
              style="cursor: pointer;"
            >
              <path
                d="M12 21C12 21 3 13.5 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.91 3.81 12.99 5.08C14.08 3.81 15.76 3 17.5 3C20.58 3 23 5.42 23 8.5C23 13.5 12 21 12 21Z"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span class="text-lg font-semibold text-red-500 group-hover:text-red-700 transition">{post.hearts}</span>
          </button>
          <img src={post.avatar} alt={post.name} class="w-20 h-20 rounded-full object-cover border-4 border-blue-200 mx-auto md:mx-0" />
          <div class="flex-1 flex flex-col justify-center">
            <div class="flex items-center gap-2 mb-2">
              <span class="font-bold text-blue-800">{post.name}</span>
              <span class="text-sm text-gray-400">{post.date}</span>
            </div>
            <div class="flex flex-wrap gap-4 mb-2">
              <span class="bg-blue-100 text-blue-800 px-3 py-1.5 rounded text-base">{post.institution}</span>
              <span class="bg-blue-100 text-blue-800 px-3 py-1.5 rounded text-base">{post.course}</span>
            </div>
            <p class="text-lg text-gray-700 italic">"{post.testimony}"</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>