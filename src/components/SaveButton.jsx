import { useFormStatus } from 'react-dom';

export default function EditButton({ formAction }) {
  const { pending, action } = useFormStatus();
  // 只响应自己的 action
  const isPending = pending && action === formAction;
  return (
    <button
      className="note-editor-done"
      type="submit"
      formAction={formAction}
      disabled={isPending}
      style={{
        cursor: isPending ? 'not-allowed' : 'pointer',
      }}
      role="menuitem"
    >
      <img src="/checkmark.svg" width="14px" height="10px" alt="" role="presentation" />
      {isPending ? '保存中 ....' : '完成'}
    </button>
  );
}
