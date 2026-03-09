"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Category } from "@my-prisma/client";

import { categoryCreateOptions, categoryDeleteOptions, categoryOptions, categoryUpdateOptions } from "@/services/category/options";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

export default function CategoryManage() {
  const queryClient = useQueryClient();
  const { data: categories, isLoading } = useQuery(categoryOptions);

  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: categoryOptions.queryKey });
    setNewCategory("");
    setEditingCategory(null);
  };

  const categoryCreate = useMutation({
    ...categoryCreateOptions,
    onSuccess: () => {
      toast.success("카테고리가 생성되었습니다.");
      onSuccess();
    },
    onError: () => toast.error("카테고리 생성 중 오류가 발생했습니다."),
  });

  const categoryUpdate = useMutation({
    ...categoryUpdateOptions,
    onSuccess: () => {
      toast.success("카테고리가 수정되었습니다.");
      onSuccess();
    },
    onError: () => toast.error("카테고리 수정 중 오류가 발생했습니다."),
  });

  const categoryDelete = useMutation({
    ...categoryDeleteOptions,
    onSuccess: () => {
      toast.success("카테고리가 삭제되었습니다.");
      onSuccess();
    },
    onError: () => toast.error("카테고리 삭제 중 오류가 발생했습니다."),
  });

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      categoryCreate.mutate({ name: newCategory.trim() });
    }
  };

  const handleUpdateCategory = () => {
    if (editingCategory && editingCategory.name.trim()) {
      categoryUpdate.mutate({
        id: editingCategory.id,
        name: editingCategory.name.trim(),
      });
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">관리</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">카테고리 관리</h4>
            <p className="text-muted-foreground text-sm">카테고리를 추가, 수정, 삭제합니다.</p>
          </div>
          <Separator />
          <div className="flex gap-2">
            <Input value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="새 카테고리 이름" />
            <Button onClick={handleAddCategory} disabled={categoryCreate.isPending}>
              추가
            </Button>
          </div>
          <div className="grid gap-2">
            {isLoading && <p>로딩 중...</p>}
            {categories?.map((category: Category) => (
              <div key={category.id} className="flex items-center justify-between gap-2">
                {editingCategory?.id === category.id ? (
                  <Input
                    value={editingCategory.name}
                    onChange={(e) =>
                      setEditingCategory({
                        ...editingCategory,
                        name: e.target.value,
                      })
                    }
                  />
                ) : (
                  <span>{category.name}</span>
                )}
                <div className="flex gap-1">
                  {editingCategory?.id === category.id ? (
                    <>
                      <Button variant="ghost" size="sm" onClick={handleUpdateCategory}>
                        저장
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setEditingCategory(null)}>
                        취소
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setEditingCategory({
                            id: category.id,
                            name: category.name,
                          })
                        }
                      >
                        수정
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                            삭제
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>정말 삭제하시겠습니까?</AlertDialogTitle>
                            <AlertDialogDescription>
                              이 카테고리에 속한 모든 게시글의 카테고리 정보가 초기화될 수 있습니다.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>취소</AlertDialogCancel>
                            <AlertDialogAction onClick={() => categoryDelete.mutate({ id: category.id })}>삭제</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
