"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "sonner";

import { storage } from "@/lib/firebase.browser";
import { type CreateServiceInput, type Service } from "@/db/services";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ServiceFormState = {
  categoryId: string;
  description: string;
  imageUrl: string;
  name: string;
  pricePerDay: string;
  requiresQuotation: "yes" | "no";
  serviceTypeId: string;
};

type ServiceEditorFormProps = {
  categoryOptions: Array<{ id: string; name: string }>;
  initialService?: Service | null;
  mode: "create" | "edit";
  onSubmitAction: (
    payload: CreateServiceInput,
    serviceId?: string,
  ) => Promise<void>;
};

const SERVICE_TYPE_OPTIONS = [
  { label: "Architecture", value: "architecture" },
  { label: "Bâtiment / BTP", value: "batiment_construction" },
  { label: "Électricité", value: "electricite" },
  { label: "Informatique", value: "informatique" },
];

function toFormState(service?: Service | null): ServiceFormState {
  return {
    categoryId: service?.categoryId ?? "",
    description: service?.description ?? "",
    imageUrl: service?.imageUrl ?? "",
    name: service?.name ?? "",
    pricePerDay: service ? String(service.pricePerDay) : "",
    requiresQuotation: service?.requiresQuotation ? "yes" : "no",
    serviceTypeId: service?.serviceTypeId ?? "",
  };
}

export function ServiceEditorForm({
  categoryOptions,
  initialService,
  mode,
  onSubmitAction,
}: ServiceEditorFormProps) {
  const router = useRouter();
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const [form, setForm] = React.useState<ServiceFormState>(() =>
    toFormState(initialService),
  );
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [localPreviewUrl, setLocalPreviewUrl] = React.useState<string | null>(
    null,
  );
  const [dragActive, setDragActive] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setForm(toFormState(initialService));
  }, [initialService]);

  React.useEffect(() => {
    if (!selectedFile) {
      setLocalPreviewUrl(null);
      return;
    }

    const nextPreviewUrl = URL.createObjectURL(selectedFile);
    setLocalPreviewUrl(nextPreviewUrl);

    return () => {
      URL.revokeObjectURL(nextPreviewUrl);
    };
  }, [selectedFile]);

  const buildPayload = (
    resolvedImageUrl: string | null,
  ): CreateServiceInput | null => {
    const pricePerDay = Number(form.pricePerDay);

    if (
      !form.name.trim() ||
      !form.description.trim() ||
      !form.categoryId.trim()
    ) {
      setSubmitError("Nom, description et catégorie sont requis.");
      return null;
    }

    if (!form.serviceTypeId.trim()) {
      setSubmitError("Le type de service est requis.");
      return null;
    }

    if (Number.isNaN(pricePerDay) || pricePerDay < 0) {
      setSubmitError("Le prix par jour doit être un nombre positif.");
      return null;
    }

    return {
      categoryId: form.categoryId.trim(),
      description: form.description.trim(),
      imageUrl: resolvedImageUrl,
      name: form.name.trim(),
      pricePerDay,
      requiresQuotation: form.requiresQuotation === "yes",
      serviceTypeId: form.serviceTypeId.trim(),
    };
  };

  const uploadImageIfNeeded = async (): Promise<string | null> => {
    if (!selectedFile) {
      return form.imageUrl.trim() ? form.imageUrl.trim() : null;
    }

    const extension = selectedFile.name.split(".").pop() ?? "jpg";
    const key = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${extension}`;
    const path = `services/${initialService?.id ?? "new"}/${key}`;
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, selectedFile, {
      contentType: selectedFile.type,
    });

    return getDownloadURL(storageRef);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const imageUrl = await uploadImageIfNeeded();
      const payload = buildPayload(imageUrl);
      if (!payload) {
        setIsSubmitting(false);
        return;
      }

      await onSubmitAction(payload, initialService?.id);
      toast.success(
        mode === "create" ? "Service créé." : "Service mis à jour.",
      );
      router.push("/app/services");
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Une erreur est survenue lors de l'enregistrement.";
      setSubmitError(message);
      toast.error("Impossible d'enregistrer le service.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onDropFile = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);

    const file = event.dataTransfer.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setSubmitError("Veuillez déposer une image valide.");
      return;
    }

    setSelectedFile(file);
    setSubmitError(null);
  };

  const currentImagePreview = localPreviewUrl ?? (form.imageUrl || null);

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="service-name">Nom</Label>
        <Input
          id="service-name"
          value={form.name}
          onChange={(event) =>
            setForm((previous) => ({ ...previous, name: event.target.value }))
          }
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="service-description">Description</Label>
        <Input
          id="service-description"
          value={form.description}
          onChange={(event) =>
            setForm((previous) => ({
              ...previous,
              description: event.target.value,
            }))
          }
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="service-type">Type de service</Label>
        <Select
          value={form.serviceTypeId}
          onValueChange={(value) =>
            setForm((previous) => ({ ...previous, serviceTypeId: value }))
          }
        >
          <SelectTrigger id="service-type">
            <SelectValue placeholder="Choisir un type" />
          </SelectTrigger>
          <SelectContent>
            {SERVICE_TYPE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="service-category">Catégorie</Label>
        <Select
          value={form.categoryId}
          onValueChange={(value) =>
            setForm((previous) => ({ ...previous, categoryId: value }))
          }
        >
          <SelectTrigger id="service-category">
            <SelectValue placeholder="Choisir une catégorie" />
          </SelectTrigger>
          <SelectContent>
            {categoryOptions.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="service-price">Prix / jour</Label>
        <Input
          id="service-price"
          type="number"
          min={0}
          value={form.pricePerDay}
          onChange={(event) =>
            setForm((previous) => ({
              ...previous,
              pricePerDay: event.target.value,
            }))
          }
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="service-requires-quotation">Devis requis</Label>
        <Select
          value={form.requiresQuotation}
          onValueChange={(value: "yes" | "no") =>
            setForm((previous) => ({ ...previous, requiresQuotation: value }))
          }
        >
          <SelectTrigger id="service-requires-quotation">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">Oui</SelectItem>
            <SelectItem value="no">Non</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label>Image</Label>
        <div
          className={`rounded-md border-2 border-dashed p-6 text-center text-sm ${
            dragActive ? "border-primary bg-primary/5" : "border-border"
          }`}
          onDragOver={(event) => {
            event.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={(event) => {
            event.preventDefault();
            setDragActive(false);
          }}
          onDrop={onDropFile}
        >
          <p>Glissez-déposez une image ici</p>
          <p className="text-muted-foreground">ou</p>
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="mt-2"
          >
            Sélectionner un fichier
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0] ?? null;
              if (file && !file.type.startsWith("image/")) {
                setSubmitError("Veuillez sélectionner une image valide.");
                setSelectedFile(null);
                return;
              }
              setSelectedFile(file);
              setSubmitError(null);
            }}
          />
          {selectedFile ? (
            <p className="mt-2">Fichier: {selectedFile.name}</p>
          ) : null}
        </div>
      </div>

      {currentImagePreview ? (
        <div className="grid gap-2">
          <Label>Aperçu</Label>
          <img
            src={currentImagePreview}
            alt="Aperçu du service"
            className="h-52 w-full rounded-md border object-cover"
          />
        </div>
      ) : null}

      {submitError ? (
        <p className="text-sm text-destructive">{submitError}</p>
      ) : null}

      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Enregistrement..."
            : mode === "create"
              ? "Créer le service"
              : "Mettre à jour"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/app/services")}
        >
          Annuler
        </Button>
      </div>
    </form>
  );
}
