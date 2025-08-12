<script lang="ts">
import { onMount } from 'svelte';
let carouselRef: HTMLDivElement | null = null;

function scrollCarousel(amount: number) {
  if (carouselRef) {
	carouselRef.scrollBy({ left: amount, behavior: 'smooth' });
  }
}
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '../components/Navbar.svelte';
	import ImageSlider from '../components/ImageSlider.svelte';
	import AnnouncementCard from '../components/AnnouncementCard.svelte';
	import StatsBanner from '../components/StatsBanner.svelte';
	import AboutSection from '../components/AboutSection.svelte';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navbar />
{#if $page.url.pathname === '/'}
  <div>
	<ImageSlider />
  </div>
  <StatsBanner />
	<div class="w-full flex justify-center">
	<AnnouncementCard />
  </div>
  <AboutSection/>
{/if}

{@render children?.()}