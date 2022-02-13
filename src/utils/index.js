export const siteName = 'Formal Crypto'

export const showNotification = ($notifyInstance, options) => {
  return $notifyInstance({
    group: 'formNotifications',
    ...options
  })
}
