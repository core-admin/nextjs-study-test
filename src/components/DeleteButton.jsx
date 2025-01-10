import { useFormStatus } from 'react-dom';

export default function DeleteButton({ isDraft, formAction }) {
  const { pending, action } = useFormStatus();
  const isPending = pending && action === formAction;

  return (
    !isDraft && (
      <button
        className="note-editor-delete"
        disabled={isPending}
        style={{
          cursor: isPending ? 'not-allowed' : 'pointer',
        }}
        formAction={formAction}
        role="menuitem"
      >
        <img src="/cross.svg" width="10px" height="10px" alt="" role="presentation" />
        {isPending ? '删除中...' : '删除'}
      </button>
    )
  );
}
