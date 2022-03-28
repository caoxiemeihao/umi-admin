// 地址栏 querystring
import { useLocation } from 'umi'

export default function useQuery(): Record<string, string> {
  const location = useLocation()
  const tmp = new URLSearchParams(location.search)

  return Array
    .from(tmp.entries())
    .reduce((memo, [k, v]) => Object.assign(memo, { [k]: v }), {})
}
