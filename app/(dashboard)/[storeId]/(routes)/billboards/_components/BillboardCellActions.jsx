import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import toast from 'react-hot-toast';

import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AlertModal from '@/components/modals/AlertModal';
import { deleteBillboard } from '@/utils/billboard';
import { getUser } from '@/utils/auth';

const BillboardCellActions = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onCopy = (id) => {
    navigator.clipboard.writeText(id);
    toast.success('Billboard Id copied to the clipboard');
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      const user = await getUser();
      const response = await deleteBillboard({ billboardId: data.id, ...params }, { userId: user._id });
      toast.success(response.message);
      router.refresh();
    } catch (error) {
      toast.error(error.response.message);
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <div className="text-right">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/billboards/${data.id}`)}>
            <Edit className="h-4 w-4 mr-2" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="h-4 w-4 mr-2" />
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading}>
        <div className="p-4 text-red-500 italic text-sm">
          [NOTE]: All Categories and Products related to this Billboard will be Deleted as well
        </div>
      </AlertModal>
    </div>
  );
};

export default BillboardCellActions;
