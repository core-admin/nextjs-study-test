const files = [
  {
    id: '1',
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source:
      'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
  },
  {
    id: '2',
    title: 'DSC_0123.HEIC',
    size: '2.8 MB',
    source:
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
  },
  {
    id: '3',
    title: 'IMG_2468.HEIC',
    size: '4.2 MB',
    source:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
  },
  {
    id: '4',
    title: 'PHOTO_1357.HEIC',
    size: '5.1 MB',
    source:
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
  },
  {
    id: '5',
    title: 'IMG_7890.HEIC',
    size: '3.3 MB',
    source:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
  },
  {
    id: '6',
    title: 'CAM_5678.HEIC',
    size: '4.7 MB',
    source:
      'https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
  },
  {
    id: '7',
    title: 'IMG_3579.HEIC',
    size: '2.5 MB',
    source:
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
  },
  {
    id: '8',
    title: 'PHOTO_9876.HEIC',
    size: '5.8 MB',
    source:
      'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
  },
  {
    id: '9',
    title: 'IMG_1598.HEIC',
    size: '3.6 MB',
    source:
      'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
  },
  {
    id: '10',
    title: 'CAM_7531.HEIC',
    size: '4.4 MB',
    source:
      'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
  },
  {
    id: '11',
    title: 'IMG_8642.HEIC',
    size: '3.1 MB',
    source:
      'https://images.unsplash.com/photo-1588392382834-a891154bca4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
  },
  {
    id: '12',
    title: 'PHOTO_2468.HEIC',
    size: '4.9 MB',
    source:
      'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
  },
];

export async function getDocuments() {
  return files;
}

export async function getDocumentById(id: string) {
  return files.find(file => file.id === id)!;
}
