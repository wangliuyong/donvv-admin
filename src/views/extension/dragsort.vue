<template>
  <div class="ele-body ele-body-card">
    <el-row :gutter="15">
      <el-col :md="8">
        <el-card shadow="never" header="列表拖拽排序">
          <div class="demo-drag-list">
            <draggable
              v-model="list"
              handle=".sort-handle"
              animation="300">
              <div
class="demo-drag-list-item ele-cell"
                   v-for="item in list"
                   :key="item.id">
                <div class="ele-cell-content">{{ item.name }}</div>
                <i class="sort-handle el-icon-_nav ele-text-secondary"></i>
              </div>
            </draggable>
          </div>
        </el-card>
      </el-col>
      <el-col :md="16">
        <el-card shadow="never" header="列表相互拖拽">
          <el-row :gutter="15">
            <el-col :span="12">
              <div class="demo-drag-list">
                <draggable
                  v-model="list1"
                  handle=".sort-handle"
                  group="project1"
                  animation="300">
                  <div
class="demo-drag-list-item ele-cell"
                       v-for="item in list1"
                       :key="item.id">
                    <div class="ele-cell-content">{{ item.name }}</div>
                    <i class="sort-handle el-icon-_nav ele-text-secondary"></i>
                  </div>
                </draggable>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-drag-list">
                <draggable
                  v-model="list2"
                  handle=".sort-handle"
                  group="project1"
                  animation="300">
                  <div
class="demo-drag-list-item ele-cell"
                       v-for="item in list2"
                       :key="item.id">
                    <div class="ele-cell-content">{{ item.name }}</div>
                    <i class="sort-handle el-icon-_nav ele-text-secondary"></i>
                  </div>
                </draggable>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :md="8">
        <el-card shadow="never" header="宫格拖拽排序">
          <div class="demo-drag-grid">
            <draggable
              v-model="grid"
              animation="300">
              <div
                class="demo-drag-grid-item"
                v-for="item in grid"
                :key="item.id">
                {{ item.name }}
              </div>
            </draggable>
          </div>
        </el-card>
      </el-col>
      <el-col :md="16">
        <el-card shadow="never" header="宫格相互拖拽">
          <el-row :gutter="15">
            <el-col :span="12">
              <div class="demo-drag-grid">
                <draggable
                  v-model="grid1"
                  group="project2"
                  animation="300">
                  <div
                    class="demo-drag-grid-item"
                    v-for="item in grid1"
                    :key="item.id">
                    {{ item.name }}
                  </div>
                </draggable>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="demo-drag-grid">
                <draggable
                  v-model="grid2"
                  group="project2"
                  animation="300">
                  <div
                    class="demo-drag-grid-item"
                    v-for="item in grid2"
                    :key="item.id">
                    {{ item.name }}
                  </div>
                </draggable>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'ExtensionDragSort',
  components: { draggable },
  data() {
    return {
      list: [
        { id: 1, name: '项目0000001' },
        { id: 2, name: '项目0000002' },
        { id: 3, name: '项目0000003' },
        { id: 4, name: '项目0000004' },
        { id: 5, name: '项目0000005' }
      ],
      list1: [
        { id: 1, name: '项目0000001' },
        { id: 2, name: '项目0000002' },
        { id: 3, name: '项目0000003' },
        { id: 4, name: '项目0000004' },
        { id: 5, name: '项目0000005' }
      ],
      list2: [
        { id: 6, name: '项目0000006' },
        { id: 7, name: '项目0000007' },
        { id: 8, name: '项目0000008' },
        { id: 9, name: '项目0000009' },
        { id: 10, name: '项目0000010' }
      ],
      grid: [
        { id: 1, name: '项目0000001' },
        { id: 2, name: '项目0000002' },
        { id: 3, name: '项目0000003' },
        { id: 4, name: '项目0000004' },
        { id: 5, name: '项目0000005' }
      ],
      grid1: [
        { id: 1, name: '项目0000001' },
        { id: 2, name: '项目0000002' },
        { id: 3, name: '项目0000003' },
        { id: 4, name: '项目0000004' },
        { id: 5, name: '项目0000005' }
      ],
      grid2: [
        { id: 6, name: '项目0000006' },
        { id: 7, name: '项目0000007' },
        { id: 8, name: '项目0000008' },
        { id: 9, name: '项目0000009' },
        { id: 10, name: '项目0000010' }
      ]
    }
  }
}
</script>

<style scoped>
/* 列表样式 */
.demo-drag-list {
  border: 1px solid hsla(0, 0%, 60%, .2);
}

.demo-drag-list-item {
  padding: 10px 15px;
}

.demo-drag-list-item + .demo-drag-list-item {
  border-top: 1px solid hsla(0, 0%, 60%, .2);
}

.demo-drag-list-item.sortable-chosen {
  background-color: hsla(0, 0%, 60%, .1);
}

.demo-drag-list-item .sort-handle {
  cursor: move;
  font-size: 16px;
}

/* 宫格样式 */
.demo-drag-grid {
  border: 1px solid hsla(0, 0%, 60%, .2);
  padding: 15px 0 0 15px;
}

.demo-drag-grid-item {
  padding: 15px;
  margin: 0 15px 15px 0;
  display: inline-block;
  border: 1px solid hsla(0, 0%, 60%, .2);
  cursor: move;
}

.demo-drag-grid-item.sortable-chosen {
  background-color: hsla(0, 0%, 60%, .1);
}
</style>
