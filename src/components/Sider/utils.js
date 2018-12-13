import pathToRegexp from 'path-to-regexp'
import map from 'lodash/map'
import reduce from 'lodash/reduce'
import filter from 'lodash/filter'

const formatMenuPath = (data, parentPath = '/') => {
  map(data, item => {
    const result = {
      ...item,
      path: `${parentPath}${item.path}`
    }

    if (item.children) {
      result.children = formatMenuPath(item.children, `${parentPath}${item.path}/`)
    }

    return result
  })
}

const getFlatMenuKeys = menuData => (
  reduce(menuData, (keys, item) => {
    keys.push(item.path)

    if (item.children) {
      return keys.concat(getFlatMenuKeys(item.children))
    }

    return keys
  }, [])
)

const getMenuMatchKeys = (flatMenuKeys, paths) => (
  reduce(paths, (matchKeys, path) => (
    matchKeys.concat(
      filter(flatMenuKeys, item => pathToRegexp(item).test(path))
    )
  ), [])
)

const pathUrlToList = url => {
  if (url) {
    const urlList = url.split('/').filter(v => v) 
    return map(urlList, (urlItem, index) => `/${urlList.slice(0, index + 1).join('/')}`)
  }

  return []
}

export {
  formatMenuPath,
  getFlatMenuKeys,
  getMenuMatchKeys,
  pathUrlToList,
}