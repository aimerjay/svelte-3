<script lang="ts">
  import { onMount } from 'svelte';
  type Application = {
    id?: number;
    formatted_id?: string;
    name: string;
    email: string;
    institution: string;
    course: string;
    reason: string;
    status: string;
  };
  let showModal = false;
  let applications: Application[] = [];
  import { getApplications, createApplication, updateApplication, deleteApplication } from '$lib/api';
  onMount(async () => {
    try {
      const res = await getApplications();
      if (res.success && Array.isArray(res.result)) {
        applications = res.result.map((app: any) => ({
          id: app.id,
          formatted_id: app.formatted_id,
          name: app.full_name ?? app.name,
          email: app.email,
          institution: app.institution,
          course: app.course,
          reason: app.statement ?? app.reason,
          status: app.status ?? 'Submitted'
        }));
        if (applications.length > 0) {
          status = applications[0].status || 'Submitted';
        } else {
          status = 'Not Submitted';
        }
      }
    } catch (e) {
      console.error('Failed to fetch applications:', e);
    }
  });
  let form = {
    name: '',
    email: '',
    institution: '',
    course: '',
    reason: ''
  };
  let status = 'Not Submitted';

  function openModal() {
    showModal = true;
  }
  function closeModal() {
    showModal = false;
  }
  let isEditing = false;
  async function submitApplication() {
    try {
      if (isEditing && applications.length > 0) {
        // Update the first application
        const id = applications[0].id;
        if (id !== undefined) {
          await updateApplication(String(id), { ...form, status: 'Submitted' });
        }
        isEditing = false;
      } else {
        await createApplication({ ...form, status: 'Submitted' });
      }
      // Refresh applications from backend
      const res = await getApplications();
      if (res.success && Array.isArray(res.result)) {
        applications = res.result.map((app: any) => ({
          id: app.id,
          formatted_id: app.formatted_id,
          name: app.full_name ?? app.name,
          email: app.email,
          institution: app.institution,
          course: app.course,
          reason: app.statement ?? app.reason,
          status: app.status ?? 'Submitted'
        }));
        status = applications.length > 0 ? applications[0].status || 'Submitted' : 'Not Submitted';
      }
    } catch (e) {
      console.error('Failed to submit application:', e);
    }
    closeModal();
    form = { name: '', email: '', institution: '', course: '', reason: '' };
  }
  function editApplication() {
    if (applications.length > 0) {
      form = {
        name: applications[0].name,
        email: applications[0].email,
        institution: applications[0].institution,
        course: applications[0].course,
        reason: applications[0].reason
      };
      isEditing = true;
      showModal = true;
      status = applications[0].status;
    }
  }

  // Helper for editing a specific application
  function editApplicationIdx(idx: number) {
    const app = applications[idx];
    form = {
      name: app.name,
      email: app.email,
      institution: app.institution,
      course: app.course,
      reason: app.reason
    };
    isEditing = true;
    showModal = true;
    status = app.status;
  }
</script>

<section class="min-h-screen bg-yellow-50 flex flex-col items-center py-12">
  <h1 class="text-4xl font-extrabold text-blue-900 mb-8">Scholarship Application</h1>
  <button class="bg-yellow-300 text-yellow-900 px-6 py-3 rounded-lg font-bold shadow hover:bg-yellow-400 transition" on:click={openModal}>
    Submit Application
  </button>

  {#if applications.length > 0}
    <div class="mt-8 w-2/3 mx-auto space-y-8">
      {#each applications as app, idx}
        <div class="bg-white rounded-lg shadow-xl p-6 relative">
          <div class="mb-2 text-sm text-gray-500">Application ID: <span class="font-mono font-bold text-blue-700">{app.formatted_id}</span></div>
          <div class="absolute top-4 right-4 flex gap-2">
            <button class="bg-blue-100 text-blue-700 px-6 py-2 rounded-lg font-bold shadow hover:bg-blue-200 transition" on:click={() => editApplicationIdx(idx)}>
              Edit
            </button>
            <button class="bg-red-100 text-red-700 px-6 py-2 rounded-lg font-bold shadow hover:bg-red-200 transition" on:click={async () => {
              const id = app.id;
              if (id !== undefined) {
                try {
                  await deleteApplication(String(id));
                  const res = await getApplications();
                  if (res.success && Array.isArray(res.result)) {
                    applications = res.result.map((app: any) => ({
                      id: app.id,
                      formatted_id: app.formatted_id,
                      name: app.full_name ?? app.name,
                      email: app.email,
                      institution: app.institution,
                      course: app.course,
                      reason: app.statement ?? app.reason,
                      status: app.status ?? 'Submitted'
                    }));
                    status = applications.length > 0 ? applications[0].status || 'Submitted' : 'Not Submitted';
                  } else {
                    status = 'Not Submitted';
                    applications = [];
                  }
                } catch (e) {
                  console.error('Failed to withdraw application:', e);
                }
              }
            }}>
              Withdraw Application
            </button>
          </div>
          <h2 class="text-2xl font-bold text-blue-900 mb-2">Application Status</h2>
          <p class="text-lg text-gray-700">Status: <span class="font-bold text-green-600">{app.status}</span></p>
          <div class="mt-2 text-gray-700"><strong>Name:</strong> {app.name}</div>
          <div class="mt-1 text-gray-700"><strong>Email:</strong> {app.email}</div>
          <div class="mt-1 text-gray-700"><strong>Institution:</strong> {app.institution}</div>
          <div class="mt-1 text-gray-700"><strong>Course:</strong> {app.course}</div>
          <div class="mt-1 text-gray-700"><strong>Statement:</strong> {app.reason}</div>
        </div>
      {/each}
    </div>
  {/if}

  {#if showModal}
    <div class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 backdrop-blur-md"></div>
      <div class="bg-white rounded-xl shadow-2xl p-10 w-full max-w-2xl relative mx-4">
        <button class="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-2xl" on:click={closeModal}>&times;</button>
        <h2 class="text-3xl font-bold text-blue-900 mb-8">Application Form</h2>
        <form on:submit|preventDefault={submitApplication} class="space-y-6">
          <input type="text" placeholder="Full Name" bind:value={form.name} required class="w-full px-4 py-3 border rounded" />
          <input type="email" placeholder="Email" bind:value={form.email} required class="w-full px-4 py-3 border rounded" />
          <input type="text" placeholder="Institution" bind:value={form.institution} required class="w-full px-4 py-3 border rounded" />
          <input type="text" placeholder="Course" bind:value={form.course} required class="w-full px-4 py-3 border rounded" />
          <textarea placeholder="Why do you deserve this scholarship?" bind:value={form.reason} required class="w-full px-4 py-3 border rounded resize-none"></textarea>
          <button type="submit" class="bg-yellow-300 text-yellow-900 px-8 py-3 rounded-lg font-bold shadow hover:bg-yellow-400 transition w-full">{isEditing ? 'Save' : 'Submit'}</button>
        </form>
      </div>
    </div>
  {/if}
  <!-- Decorative divider -->
  <div class="w-full flex justify-center my-12">
    <div class="h-2 w-2/3 bg-gradient-to-r from-yellow-300 via-blue-900 to-yellow-300 rounded-full"></div>
  </div>

  <!-- More details section -->
  <div class="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 mb-16">
    <h2 class="text-2xl font-bold text-blue-900 mb-4">How the Application Works</h2>
    <ul class="list-disc list-inside text-gray-700 text-lg mb-6">
      <li>Fill out the application form with accurate details.</li>
      <li>Submit your application and receive a confirmation of submission.</li>
      <li>Our team will review your application and notify you of your status via email.</li>
      <li>Successful applicants will be contacted for further steps and interviews.</li>
      <li>All information is kept confidential and used only for scholarship purposes.</li>
    </ul>
    <div class="flex flex-col md:flex-row gap-8 items-center justify-center mt-8">
      <div class="flex flex-col items-center">
        <div class="bg-yellow-300 rounded-full w-24 h-24 flex items-center justify-center shadow-lg mb-2">
          <svg class="w-12 h-12 text-blue-900" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 11c0-1.657-1.343-3-3-3s-3 1.343-3 3c0 1.657 1.343 3 3 3s3-1.343 3-3zm0 0c0-1.657-1.343-3 3-3s3 1.343 3 3c0 1.657-1.343 3-3 3s-3-1.343-3-3zm0 8v-4m0 0V7m0 4h4m-4 0H8"/></svg>
        </div>
        <span class="text-blue-900 font-semibold">Easy Process</span>
      </div>
      <div class="flex flex-col items-center">
        <div class="bg-yellow-300 rounded-full w-24 h-24 flex items-center justify-center shadow-lg mb-2">
          <svg class="w-14 h-14 text-blue-900" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="display: block; margin: auto;">
            <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" fill="none"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3" />
          </svg>
        </div>
        <span class="text-blue-900 font-semibold">Quick Review</span>
      </div>
      <div class="flex flex-col items-center">
        <div class="bg-yellow-300 rounded-full w-24 h-24 flex items-center justify-center shadow-lg mb-2">
          <svg class="w-12 h-12 text-blue-900" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 11-4 0 2 2 0 014 0zm-2 2v6m0 0h4m-4 0H7" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 13v4a2 2 0 01-2 2H7a2 2 0 01-2-2v-4" />
          </svg>
        </div>
        <span class="text-blue-900 font-semibold">Confidential & Secure</span>
      </div>
    </div>
  </div>
</section>
