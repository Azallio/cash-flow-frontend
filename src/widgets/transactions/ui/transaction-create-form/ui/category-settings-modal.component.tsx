import { SharedUi } from '@shared'
import useInfinityScroll from '@shared/service/hook/use-infinity-scroll.hook'
import { Modal } from '@shared/ui'
import { useDeleteCategoryMutation } from '@widgets/transactions/service/mutation'
import { useCategoriesQuery } from '@widgets/transactions/service/query'
import { useCallback } from 'react'

interface Props {
  opened: boolean
  onClose: () => void
}

export function CategorySettingsModal(props: Props) {
  const { opened, onClose } = props

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useCategoriesQuery({ take: 10, skip: 0 })

  const handleLoadMore = useCallback(async () => {
    if (!isFetchingNextPage && hasNextPage) {
      await fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  const lastElementRef = useInfinityScroll(() => void handleLoadMore())

  const categories = data?.pages.flatMap((page) => page.items) ?? []

  const { mutate: deleteCategory } = useDeleteCategoryMutation()

  return (
    <Modal onClose={onClose} title="Настройки категории" opened={opened}>
      <article>
        <div>
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="flex items-center justify-between gap-4"
              ref={index === categories.length - 1 ? lastElementRef : null}
            >
              <span>{category.title}</span>
              <span>{category.description}</span>
              <SharedUi.Button
                aria-label="Удалить категорию"
                variant="color:secondary size:sm"
                onClick={() => {
                  deleteCategory(category.id)
                }}
              >
                <SharedUi.Icon name="trash" className="h-4 w-4" />
              </SharedUi.Button>
            </div>
          ))}
        </div>
      </article>
    </Modal>
  )
}
