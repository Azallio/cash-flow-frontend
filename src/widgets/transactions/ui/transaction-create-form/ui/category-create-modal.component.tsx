import { SharedLib, SharedUi } from '@shared'
import type { useCreateCategoryForm } from '@widgets/transactions/model/create-category-model/use-create-category-form'

interface Props {
  isCategoryModalOpened: boolean
  setIsCategoryModalOpened: (value: boolean) => void
  categoryForm: ReturnType<typeof useCreateCategoryForm>
  isCreateCategoryPending: boolean
}

export function CategoryCreateModal({
  isCategoryModalOpened,
  setIsCategoryModalOpened,
  categoryForm,
  isCreateCategoryPending,
}: Props) {
  return (
    <SharedUi.Modal
      opened={isCategoryModalOpened}
      onClose={() => {
        setIsCategoryModalOpened(false)
      }}
      title="Новая категория"
    >
      <form className="flex flex-col gap-3" onSubmit={() => void categoryForm.submit()}>
        <SharedUi.Input
          label="Название"
          placeholder={SharedLib.Consts.CategoryFormInputFields[0].placeholder}
          {...categoryForm.form.register('title')}
        />

        <SharedUi.Input
          label="Описание"
          placeholder={SharedLib.Consts.CategoryFormInputFields[1].placeholder}
          required={false}
          {...categoryForm.form.register('description')}
        />

        <SharedUi.Button type="submit" variant="color:primary size:md" disabled={isCreateCategoryPending}>
          {isCreateCategoryPending ? 'Создание...' : 'Создать категорию'}
        </SharedUi.Button>
      </form>
    </SharedUi.Modal>
  )
}
