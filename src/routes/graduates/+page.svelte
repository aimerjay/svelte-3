<script lang="ts">
  let posts = [
    {
      name: 'Jane Doe',
      avatar: '/images/award.jpg',
      institution: 'State University',
      course: 'BS Computer Science',
      date_grad: '2025-06-01',
      testimony: 'The scholarship changed my life! I was able to finish my studies and now have a great job.',
      date_posted: 1745865600000 // Example timestamp for 2025-05-28
    },
    {
      name: 'John Smith',
      avatar: '/images/award.jpg',
      institution: 'City College',
      course: 'BA English',
      date_grad: '2025-05-20',
      testimony: 'Thanks to the foundation, I graduated debt-free and made lifelong friends.',
      date_posted: 1745260800000 // Example timestamp for 2025-05-21
    }
  ];

  let name = '';
  let institution = '';
  let course = '';
  let date_grad = '';
  let testimony = '';
  let showModal = false;

  function openModal() {
    showModal = true;
  }
  function closeModal() {
    showModal = false;
    name = '';
    institution = '';
    course = '';
    date_grad = '';
    testimony = '';
  }
  function addPost() {
    if (!name || !testimony || !date_grad) return;
    posts = [
      {
        name,
        avatar: '/images/award.jpg',
        institution,
        course,
        date_grad,
        testimony,
        date_posted: Date.now()
      },
      ...posts
    ];
    closeModal();
  }

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
          <form class="flex flex-col gap-4" on:submit|preventDefault={addPost}>
            <input class="border rounded px-3 py-2" placeholder="Your Name" bind:value={name} required />
            <input class="border rounded px-3 py-2" placeholder="Institution" bind:value={institution} required />
            <input class="border rounded px-3 py-2" placeholder="Course" bind:value={course} required />
            <input class="border rounded px-3 py-2" type="date" placeholder="Date of Graduation" bind:value={date_grad} required />
            <textarea class="border rounded px-3 py-2" placeholder="Share your testimony..." bind:value={testimony} required rows="3"></textarea>
            <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded self-end" type="submit">Post</button>
          </form>
        </div>
      </div>
    {/if}

    <div class="space-y-8">
      {#each posts as post, idx}
        <div class="relative rounded-lg shadow p-6 flex flex-col md:flex-row gap-6" style="background-color: #F6F1E9;">
          {#if post.date_posted}
            <span class="absolute top-4 right-6 text-sm text-gray-500">Date Posted: <span class="font-semibold">{new Date(post.date_posted).toLocaleDateString()}</span></span>
          {/if}
          <img src={post.avatar} alt={post.name} class="w-20 h-20 rounded-full object-cover border-4 border-blue-200 mx-auto md:mx-0" />
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