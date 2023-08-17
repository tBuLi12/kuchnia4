<script lang="ts">
	import dots from '../assets/dots.svg';

	interface $$Props {
		class?: string;
	}
</script>

<img class="aspect-square animate-spin {$$props.class ?? ''}" src={dots} />
