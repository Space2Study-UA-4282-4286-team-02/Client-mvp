import PageWrapper from '~/components/page-wrapper/PageWrapper'
import CategoryItemList from '~/containers/category-item-list/CategoryItemList'

const Categories = () => {
  return (
    <PageWrapper>
      Categories
      <CategoryItemList
        items={[
          {
            _id: '1',
            appearance: { color: '#FB8C00', icon: 'math' },
            name: 'test',
            totalOffers: { student: 5, tutor: 5 }
          }
        ]}
      />
    </PageWrapper>
  )
}

export default Categories
