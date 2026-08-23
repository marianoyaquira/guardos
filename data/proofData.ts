export type OperatorMark = {
  id: string;
  name: string;
  logoSrc?: string;
};

export type PendingSlot = {
  id: string;
  pending: true;
};

export type ProofVoice = {
  id: string;
  name: string;
  organization: string;
  photoSrc: string;
};

export const proofData = {
  photoSrc: "/images/surfland/pedro.png",
  name: "Pedro",
  organization: "Surfland Brasil",
} as const;

export const operators: Array<OperatorMark | PendingSlot> = [
  { id: "surfland", name: "Surfland Brasil" },
  { id: "operator-2", pending: true },
  { id: "operator-3", pending: true },
  { id: "operator-4", pending: true },
];

export const voices: Array<ProofVoice | PendingSlot> = [
  {
    id: "pedro",
    name: proofData.name,
    organization: proofData.organization,
    photoSrc: proofData.photoSrc,
  },
  { id: "voice-2", pending: true },
];

export function isPending(
  item: OperatorMark | ProofVoice | PendingSlot,
): item is PendingSlot {
  return "pending" in item && item.pending === true;
}
