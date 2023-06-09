'use client';

import { useCallback, useState } from 'react';
import { signIn } from 'next-auth/react';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import useLoginModal from '@/app/hooks/useLoginModal';

import { useRouter } from 'next/navigation';

const LoginModal = () => {
  const router = useRouter();

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    // signIn is imported from next-auth/react
    // Basically we are spreading the 'credentials' data as we have made in the [...nextauth].ts
    // his means that verify with the 'credentials' wrt to the data just provided in form, we are sending the data from the forms to the [...nextauth].ts
    // where it will be verified using mongoDB find query and if it is found out, it will return a user
    signIn('credentials', {
      //data is passed from the form using react form hooks
      ...data,
      redirect: false, //wouldnt redirect upon successful or unsuccessful login
      //callback is the signIn reponse we receive
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success('Logged in');
        //refresh will refresh all of the active values there
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  //for toggling modals
  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);


  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your Account!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        errors={errors}
        register={register}
        required
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        errors={errors}
        register={register}
        required
      />
    </div>
  );

  const FooterContent = (
    <div className=" flex-col flex gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div
        className="
      text-neutral-500
      text-center
      mt-4
      font-light
      "
      >
        <div className="flex flex-row justify-center items-center gap-2">
          <div>First time using Airbnb?</div>
          <div
            onClick={toggle}
            className="
          cursor-pointer
          hover:underline
        text-rose-500
          font-semibold
          "
          >
            Create an Account
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={FooterContent}
    />
  );
};

export default LoginModal;
