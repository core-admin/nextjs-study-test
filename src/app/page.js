// const sleep = ms => new Promise(r => setTimeout(r, ms));

export default async function Page() {
  // await sleep(3000);
  return (
    <div className="note--empty-state">
      <span className="note-text--empty-state">Click a note on the left to view something! 🥺</span>
    </div>
  );
}
