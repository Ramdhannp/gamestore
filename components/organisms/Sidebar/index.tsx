import Profile from './Profile'
import Footer from './Footer'
import MenuItem from './MenuItem'
interface SidebarProps {
  activeMenu: 'overview' | 'transactions' | 'settings'
}

export default function Sidebar (props: SidebarProps) {
  const { activeMenu } = props
  return (
    <section className="sidebar">
      <div className="content pt-50 pb-30 ps-30">
        <Profile />
        <div className="menus">
          <MenuItem
            title="Overview"
            icon="overview"
            active={activeMenu === 'overview'}
            href="/member"
          />
          <MenuItem
            title="Transactions"
            icon="transactions"
            href="/member/transactions"
            active={activeMenu === 'transactions'}
          />
          <MenuItem title="Messages" icon="messages" href="/member" />
          <MenuItem title="Card" icon="card" href="/member" />
          <MenuItem title="Rewards" icon="reward" href="/member" />
          <MenuItem
            title="Settings"
            icon="settings"
            href="/member/edit-profile"
            active={activeMenu === 'settings'}
          />
          <MenuItem title="Log Out" icon="logout" href="/sign-in" />
        </div>
        <Footer />
      </div>
    </section>
  )
}
