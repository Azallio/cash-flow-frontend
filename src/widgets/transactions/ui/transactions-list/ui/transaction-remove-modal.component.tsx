import { SharedUi } from '@shared'

interface Props {
  isOpen: boolean
  onClose: () => void
  isDeleteTransactionPending: boolean
  handleDeleteTransaction: () => void
  setDeleteTransactionId: (id: number | null) => void
}

export function TransactionRemoveModal(props: Props) {
  const { isOpen, onClose, isDeleteTransactionPending, handleDeleteTransaction, setDeleteTransactionId } =
    props
  return (
    <SharedUi.Modal opened={isOpen} onClose={onClose} title="Удалить транзакцию">
      <div className="flex flex-col gap-4">
        <p className="text-sm">Вы уверены, что хотите удалить эту транзакцию?</p>

        <div className="flex items-center justify-end gap-2">
          <SharedUi.Button
            variant="color:secondary size:md"
            type="button"
            onClick={() => { setDeleteTransactionId(null); }}
            disabled={isDeleteTransactionPending}
          >
            Отмена
          </SharedUi.Button>
          <SharedUi.Button
            variant="color:primary size:md"
            type="button"
            onClick={handleDeleteTransaction}
            disabled={isDeleteTransactionPending}
          >
            {isDeleteTransactionPending ? 'Удаление...' : 'Удалить'}
          </SharedUi.Button>
        </div>
      </div>
    </SharedUi.Modal>
  )
}
