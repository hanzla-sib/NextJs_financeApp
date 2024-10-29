import { deleteTransactions } from "@/lib/action";
import Button from "./button";
import { Loader, X } from "lucide-react";
import { useState } from "react";

export const TransactionItemRemoveButton = ({ id, onRemoved }) => {
  const [loading, setLoading] = useState(false);
  const [confirmetion, setConfirmation] = useState(false);
  const handleClick = async () => {
    if (!confirmetion) {
      setConfirmation(true);
      return;
    }
    try {
      setLoading(true);
      await deleteTransactions(id);
      onRemoved();
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      disabled={loading}
      size="xs"
      variant={!confirmetion ? "ghost" : "danger"}
      onClick={handleClick}
    >
      {!loading && <X className="w-4 h-4" />}
      {loading && <Loader className="w-4 h-4 animate-spin" />}
    </Button>
  );
};
