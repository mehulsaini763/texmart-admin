'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

import toast from 'react-hot-toast';
import axios from 'axios';
import { CldUploadWidget } from 'next-cloudinary';
import { signOut } from 'next-auth/react';

import { ImagePlus, LogOut, User2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const Profile = ({ user }) => {
  const router = useRouter();
  const onLogout = async () => await signOut();
  const onConfirm = async (result) => {
    try {
      const response = (await axios.patch('/api/user', { avatar: result.info.secure_url })).data;
      toast.success(response.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      router.refresh();
    }
  };
  console.log(user);
  
  return (
    <div className="text-right">
      <CldUploadWidget uploadPreset="tu61dcls" onSuccess={onConfirm} options={{ maxFiles: 1, multiple: false }}>
        {({ open }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className='pl-1 pr-2'>
                <div className="flex gap-2 items-center">
                  <div className='relative h-8 w-8'>
                    {user?.image ? (
                      <Image className="object-cover" fill sizes='10vw' alt={'User'} src={user?.image} />
                    ) : (
                      <User2 className="h-4 w-4" />
                    )}
                  </div>
                  <p className="text-sm">{user?.fullName}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => open()} disabled={!user}>
                <ImagePlus className="h-4 w-4 mr-2" />
                Change Avatar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default Profile;
