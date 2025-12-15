export default function SlugCreator(text: string) {
    let slug = text.replace(/ /g, '');
    slug = slug.replace(/[^a-zA-Z0-9 ]/g, '');
    slug = slug.toLowerCase();
    return slug;
}