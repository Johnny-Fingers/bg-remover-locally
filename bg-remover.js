import { RemoveBackground } from 'runonweb/remove-bg';
import petImageUrl from './pet-1.jpeg';

const status = document.querySelector('#status');

function report(info) {
	status.textContent = info.progress == null ? info.status : `${info.status} ${Math.round(info.progress)}%`;
}

try {
	const remover = new RemoveBackground({ onProgress: report });

	await remover.load();

	const imageFile = petImageUrl;
	document.querySelector('#original').src = imageFile;

	// Blob, File, URL, HTMLImageElement, ImageData, or canvas
	const png = await remover.remove(imageFile);
	// png is a PNG Blob with alpha channel

	const resultUrl = URL.createObjectURL(png);
	document.querySelector('#result').src = resultUrl;
	status.textContent = `Listo · dispositivo: ${remover.device}`;

	const download = document.querySelector('#download');
	download.addEventListener('click', () => {
		const a = document.createElement('a');
		a.href = resultUrl;
		a.download = 'pet-1-sin-fondo.png';
		a.click();
	});
	download.hidden = false;

	remover.dispose();
} catch (err) {
	status.classList.add('error');
	status.textContent = err instanceof Error ? err.message : String(err);
}
