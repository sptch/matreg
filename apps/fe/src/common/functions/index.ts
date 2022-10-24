export function searchObjectsByName(objects: any[], string: string) {
  return objects?.filter((object) => {
    return (
      object?.type?.toLowerCase().includes(string?.toLowerCase()) ||
      object?.family?.toLowerCase().includes(string?.toLowerCase()) ||
      object?.category?.toLowerCase().includes(string?.toLowerCase())
    );
  });
}

export function searchObjectsById(objects: any[], string: string) {
  return objects?.filter((object) => {
    return object?.id?.toLowerCase().includes(string.toLowerCase());
  });
}
