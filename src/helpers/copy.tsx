export default function copy(
    id: string | undefined,
    type: 'id' | 'url'
): string {
    if (!id) return '';

    const $input = document.createElement('input');

    $input.value =
        type === 'url'
            ? `${window.location.origin}?roomID=${encodeURI(id)}`
            : id;

    document.body.appendChild($input);
    $input.select();
    document.execCommand('copy');
    $input.remove();

    return `${
        type === 'id' ? 'Room ID' : 'URL address'
    } is copied to your clipboard.`;
}
