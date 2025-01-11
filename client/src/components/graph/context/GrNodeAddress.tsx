import type {NodeAddress} from '@/components/hooks/useNodeDto';
import {createContext} from 'react';

const GrNodeAddress = createContext<NodeAddress | null>(null);
GrNodeAddress.displayName = 'GrNodeAddress';

export {GrNodeAddress};
