import { useAccount, useReadContract } from 'wagmi';
import { formatUnits } from 'viem';

const MARZ_CONTRACT_ADDRESS = '0x46ed4Cbc...d1F912654' as \`0x\${string}\`; 

const erc20Abi = [
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: 'balance', type: 'uint256' }],
  },
  {
    name: 'decimals',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: 'decimals', type: 'uint8' }],
  }
] as const;

export function useMarzToken() {
  const { address, isConnected } = useAccount();

  const { data: balance, isLoading: isBalanceLoading } = useReadContract({
    address: MARZ_CONTRACT_ADDRESS,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: isConnected && !!address },
  });

  const { data: decimals } = useReadContract({
    address: MARZ_CONTRACT_ADDRESS,
    abi: erc20Abi,
    functionName: 'decimals',
  });

  const formattedBalance = balance && decimals ? Number(formatUnits(balance as bigint, decimals as number)) : 0;
  const hasAccess = formattedBalance >= 1;

  return {
    balance: formattedBalance,
    hasAccess,
    isLoading: isBalanceLoading,
    isConnected,
  };
}
