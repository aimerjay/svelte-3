<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
let images = [
  '/images/award.jpg',
  '/images/gradu.jpg',
  '/images/scho.png'
];
  let current = 0;
  let interval: ReturnType<typeof setInterval>;

  onMount(() => {
    interval = setInterval(() => {
      current = (current + 1) % images.length;
    }, 6000); // Change slide every 6 seconds
  });

  onDestroy(() => {
    clearInterval(interval);
  });
import { goto } from '$app/navigation';
</script>

<div class="image-slider-container">
  <div class="image-slider-overlay">
  <h1 class="image-slider-title">Welcome to Our School</h1>
  <button class="image-slider-apply-btn" on:click={() => goto('/application')}>Apply Now</button>
  </div>
  {#each images as img, i}
    <img
      src={img}
      alt="Slide {i + 1}"
      class="image-slider-img {current === i ? 'active' : ''}"
    />
  {/each}
  <div class="image-slider-indicators">
    {#each images as _, i}
      <span class="image-slider-indicator {current === i ? 'active' : ''}"></span>
    {/each}
  </div>
</div>
