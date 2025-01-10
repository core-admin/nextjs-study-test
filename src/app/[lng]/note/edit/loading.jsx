/**
 * 同级的page.js确实没有请求，但 loading.js会将 page.js 和其 children 都包裹在 <Suspense> 中，
 * 所以 /app/note/edit/[id]/page.js中的请求也会触发该 loading.js。
 */

export default function EditSkeleton() {
  return (
    <div className="note-editor skeleton-container" role="progressbar" aria-busy="true">
      <div className="note-editor-form">
        <div className="skeleton v-stack" style={{ height: '3rem' }} />
        <div className="skeleton v-stack" style={{ height: '100%' }} />
      </div>
      <div className="note-editor-preview">
        <div className="note-editor-menu">
          <div className="skeleton skeleton--button" style={{ width: '8em', height: '2.5em' }} />
          <div
            className="skeleton skeleton--button"
            style={{ width: '8em', height: '2.5em', marginInline: '12px 0' }}
          />
        </div>
        <div
          className="note-title skeleton"
          style={{ height: '3rem', width: '65%', marginInline: '12px 1em' }}
        />
        <div className="note-preview">
          <div className="skeleton v-stack" style={{ height: '1.5em' }} />
          <div className="skeleton v-stack" style={{ height: '1.5em' }} />
          <div className="skeleton v-stack" style={{ height: '1.5em' }} />
          <div className="skeleton v-stack" style={{ height: '1.5em' }} />
          <div className="skeleton v-stack" style={{ height: '1.5em' }} />
        </div>
      </div>
    </div>
  );
}
