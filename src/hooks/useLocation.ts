// src/hooks/useLocation.ts
import {useMemo} from 'react';
import {useQuery} from '@tanstack/react-query';
import {getProvinces, getWardsByProvince, ProvinceDto, WardDto} from '@/services/location.api';

export type SelectItem = {id: string; name: string; code: number};

const normalizeList = (arr?: any[]) => (Array.isArray(arr) ? arr : []);

export const useProvinces = () => {
  const q = useQuery({
    queryKey: ['location', 'provinces'],
    queryFn: getProvinces,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
    retry: 1,
  });

  const items = useMemo<SelectItem[]>(() => {
    const data = normalizeList((q.data as any)?.data) as ProvinceDto[];
    return data
      .filter(p => typeof p?.code === 'number' && !!p?.name)
      .map(p => ({id: String(p.code), name: p.name, code: p.code}));
  }, [q.data]);

  return {...q, items};
};

export const useWards = (provinceCode?: number) => {
  const enabled = typeof provinceCode === 'number' && provinceCode > 0;

  const q = useQuery({
    queryKey: ['location', 'wards', provinceCode],
    queryFn: () => getWardsByProvince(provinceCode as number),
    enabled,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    retry: 1,
  });

  const items = useMemo<SelectItem[]>(() => {
    const data = normalizeList((q.data as any)?.data) as WardDto[];
    return data
      .filter(w => typeof w?.code === 'number' && !!w?.name)
      .map(w => ({id: String(w.code), name: w.name, code: w.code}));
  }, [q.data]);

  return {...q, items, enabled};
};
