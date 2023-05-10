'use client';

import React, { useMemo, useState } from 'react';
import Modal from './Modal';
import useRentModal from '@/app/hooks/useRentModal';
import Heading from '../Heading';
import { catagories } from '../navbar/Catagories';
import CategoryInput from '../inputs/CategoryInput';
import { FieldValues, useForm } from 'react-hook-form';

//WE gonna select the number of rooms,bathrooms,guests etc
enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    },
  });

  //because we have made some changes and made the categroryInput a new component

  const category = watch('category');

  //for increase or decrease the count
  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  //the actionlabel must have to be dynamic here
  const actionLabel = useMemo(() => {
    //the the uses this is the last step and create the preference
    if (step === STEPS.PRICE) return 'Create';

    //otherwise say the user that there are more steps remaining
    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    //if we are on the first step no back option
    if (step === STEPS.CATEGORY) return undefined;
    //if we are not there we can go back
    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className="flex-col flex gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a Category"
      />
      <div
        className="
      grid
      grid-cols-1
      md:grid-cols-2
      gap-3
      max-h-[50vh]
      overflow-y-auto
        "
      >
        {catagories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={() => {}}
              selected={false}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={rentModal.onClose}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      //will check if he is on the first step, if yes there is no back option else we will give onBack
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="Airbnb Your Home!"
      body={bodyContent}
    />
  );
};

export default RentModal;
